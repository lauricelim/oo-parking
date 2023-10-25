class CarsController < ApplicationController
  def index
    render json: Car.all
  end

  def create
    car = Car.new(car_params)
    
    if car.save
      render json: {success: true}
    else
      render json: {error: car.error}
    end
  end

  def park
    # entry starts from 1 for first entrance
    index = park_params[:entry].to_i - 1
    
    car = Car.find(park_params[:id])
    selected_parking = find_parking(car, index)

    if selected_parking[:error]
      render json: selected_parking[:error], status: 404
    else
      render json: {function: "Park", selected_parking: selected_parking}
    end
  end

  def unpark
    car = Car.find(park_params[:id])
    total_fee = calculate_fee(car)
    render json: {function: "Unpark", totalFee: total_fee}
  end

  private

  def car_params
    params.require(:car).permit(:size)
  end

  def park_params
    params.require(:car).permit(:id, :size, :time, :entry)
  end

  def unpark_params
    params.require(:car).permit(:id, :time)
  end

  def find_parking car, index
    available_parking = Parking.where("is_available = true AND size >= ? ", car.size)
    return { error: "No Available Parking." } unless available_parking

    selected_parking = available_parking.max_by { |parking| parking.distance[index] }
    return { error: "No Available Parking." } unless selected_parking
    
    car.update(park_time: park_params[:time], parking_id: selected_parking.id)
    selected_parking.update(is_available: false)
    # save car parking/time parked
    if (car.unpark_time.present? && ((car.unpark_time - park_params[:time]).seconds.in_hours) < 1 )
      # if less than 1 hour from unpark to park again, do not save new time
    else
      # save new park_time
      # car.update(park_time: park_params[:time], parking_id: selected_parking.id)
    end
    selected_parking.update(is_available: false)
    selected_parking
  end

  def calculate_fee car
    parking_size = car.parking.size
    total_fee = 0
    parked_hours = (unpark_params[:time].to_time - car.park_time).seconds.in_hours.ceil

    if (parked_hours >= 24)
      excess_days = parked_hours / 24
      total_fee += 5000 * excess_days
      excess_hours = parked_hours % 24
      total_fee += size_pricing(parking_size) * excess_hours
    elsif parked_hours > 3
      excess_hours = parked_hours - 3
      total_fee += 40 + (size_pricing(parking_size) * excess_hours)
    elsif parked_hours <= 3
      total_fee += 40
    end
    car.parking.update(is_available: true)
    car.update(unpark_time: unpark_params[:time], parking_id: nil)
    total_fee
  end

  def size_pricing parking_size
    case parking_size
    when 1
      return 20
    when 2
      return 60
    when 3
      return 100
    else
      "error size"
    end
  end
end

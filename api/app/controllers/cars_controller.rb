class CarsController < ApplicationController
  CAR_SIZES = {
    small: 1,
    medium: 2,
    large: 3
  }

  def index
    render json: {name: "Car"}
  end

  def park
    # entry starts from 1 for first entrance
    index = params["entry"] - 1
    car = params["car"]
    parking_layout = params["parking"]["layout"]
    selected_parking = find_parking(car, parking_layout, index)
    
    render json: {function: "Park", selected_parking: selected_parking}
  end

  def unpark
    total_fee = calculate_fee(params["parking_size"], params["park_time"].to_time, params["unpark_time"].to_time)
    render json: {function: "Unpark", total_fee: total_fee}
  end

  private

  def find_parking car, layout, index
    available_parking = layout.select {|parking| parking["is_available"] && (parking["size"] >= car["size"]) }
    parking_number = available_parking.max_by { |parking| parking["distance"][index] }
    # save car parking/time parked
    if (unpark_time && ((unpark_time - park_time).seconds.in_hours) < 1 )
      # if less than 1 hour from unpark to park again, do not save new time
    else
      # save new park_time
    end
    parking_number
  end

  def calculate_fee parking_size, park_time, unpark_time
    total_fee = 0
    parked_hours = (unpark_time - park_time).seconds.in_hours.ceil

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

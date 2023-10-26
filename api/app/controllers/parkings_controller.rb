class ParkingsController < ApplicationController
  def index
    render json: Parking.all.order(:id)
  end

  def create
    parking = Parking.new(parking_params)
    
    if parking.save
      render json: {success: true}
    else
      render json: {error: parking.error}
    end
  end

  def update
    parking = Parking.find(params[:id])
    if parking.update(parking_params)
      render json: parking
    else
      render json: {error: parking.error}
    end
  end

  private

  def parking_params
    params.require(:parking).permit(:size, :is_available, :distance => [])
  end
  
end

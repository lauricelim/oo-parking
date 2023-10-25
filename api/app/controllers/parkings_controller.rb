class ParkingsController < ApplicationController
  def index
    render json: Parking.all
  end

  def create
    parking = Parking.new(params)
    if parking.create
      render json: {success: true}
    else
      render json: {error: parking.error}
    end
  end

  def update
    parking = Parking.find(params[:id])
    if parking.update(params)
      render json: {success: true}
    else
      render json: {error: parking.error}
    end
  end
  
end

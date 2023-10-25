class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.integer :size
      t.datetime :park_time
      t.datetime :unpark_time

      t.timestamps
    end
  end
end

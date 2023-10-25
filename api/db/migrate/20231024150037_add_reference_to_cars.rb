class AddReferenceToCars < ActiveRecord::Migration[7.0]
  def change
    add_reference :cars, :parking, null: true, foreign_key: true
  end
end

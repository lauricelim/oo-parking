class CreateParkings < ActiveRecord::Migration[7.0]
  def change
    create_table :parkings do |t|
      t.integer :size
      t.jsonb :distance
      t.boolean :is_available, default: true

      t.timestamps
    end
  end
end

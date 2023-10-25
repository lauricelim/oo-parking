class Car < ApplicationRecord
  belongs_to :parking, optional: true
end

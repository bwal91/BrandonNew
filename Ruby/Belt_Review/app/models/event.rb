class Event < ApplicationRecord

	has_many :parties, :dependent => :delete_all
	has_many :users, through: :parties, :dependent => :delete_all
	belongs_to :user, :dependent => :delete

	validates :name, :date, :city, :state, :user_id, presence: :true
end

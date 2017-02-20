class Comment < ApplicationRecord
	belongs_to :event
	belongs_to :user
	
	validates :comment, :user_id, :event_id, presence: :true
end

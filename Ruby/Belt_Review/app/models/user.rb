class User < ApplicationRecord
	has_secure_password

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

	has_many :parties
	has_many :events, through: :parties

	validates :first_name, :last_name, :city, :state, presence: :true
	validates :password, :password_confirmation, presence: :true, if: :password, if: :password_confirmation
	validates :email, presence: :true, uniqueness: :true

end



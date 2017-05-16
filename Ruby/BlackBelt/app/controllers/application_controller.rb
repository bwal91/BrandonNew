class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]
	end

	helper_method :current_user
		

	def authorize
		redirect_to :root unless current_user
		flash[:notice] = "You must be logged in to continue!"
	end

	helper_method :authorize


end
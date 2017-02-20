class UsersController < ApplicationController
before_filter :require_login, :except =>[:index, :register, :login]

  def index
  
  end

  def register
  	@user = User.new(user_params)
  	if @user.save
  		session[:user] = @user.first_name
  		session[:user_id] = @user.id
  		session[:user_state] = @user.state
  		session[:user_pw] = params[:password]
  		redirect_to '/events'
  	else
  		flash[:error] = @user.errors.full_messages
  		redirect_to '/'
  	end
  end

  def login
  	user = User.find_by_email(params[:login_email])
  	if user && user.authenticate(params[:login_password])
  		session[:user] = user.first_name
  		session[:user_id] = user.id
  		session[:user_state] = user.state
  		session[:user_pw] = params[:login_password]
  		redirect_to '/events'
  	else
  		flash[:danger] = "Invalid email/password combination!"
  		redirect_to '/'
  	end

  end

  def logout
  	session.clear
  	redirect_to '/'
  end
  def show_user
  	@user = User.find(session[:user_id])
  	render 'edit_user'
  end
  def edit_user
	@user = User.find(params[:id])
	if @user.update(user_params)
		redirect_to '/events'
	else
		flash[:error] = @user.errors.full_messages
		redirect_to '/show_user'
	end

  end

  private
	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, :city, :state, :password, :password_confirmation)
	end	
end















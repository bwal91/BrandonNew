class EventsController < ApplicationController
  def index
  	
    @curr_events = Event.where(state: session[:user_state])
  	@all_events = Event.where.not(state: session[:user_state])
    @attending = Party.where(user: session[:user_id])
    @party = Party.all

  end

  def create
    @event = Event.new(event_params)
    if @event.save
      Party.create(user: @current_user, event: @event)
      redirect_to :back
    else
      flash[:error] = @event.errors.full_messages
      redirect_to :back
    end
    
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      redirect_to '/events'
    else
      flash[:error] = @event.errors.full_messages
      redirect_to :back
    end
  end


  def join
    @event = Event.find(params[:id])
    @join = Party.create(user: @current_user, event: @event)
    redirect_to :back
  end

  def show
    @count = 0
    @users = Party.where(event: params[:id])
    @event_id = params[:id]
    @host = @users.first
    @comments = Comment.where(event_id: params[:id])
    @users.each do
      @count += 1
    end

  end

  def cancel
    @event = Event.find(params[:id])
    @party = Party.where(user: @current_user, event: @event)
    @party = @party.ids[0]
    Party.find(@party).destroy
    redirect_to :back

  end

  def delete
    @event = Event.find(params[:id])
    @event.destroy
    redirect_to :back
  end
  

  private
    def event_params
      params.require(:event).permit(:name, :date, :city, :state, :user_id)
    end




end

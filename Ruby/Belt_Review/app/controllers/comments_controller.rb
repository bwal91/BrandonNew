class CommentsController < ApplicationController
  

  def index
  end

  def add
  	@comment = Comment.new(comment_params)
  	if @comment.save
  		
  		redirect_to :back
  	else
  		flash[:error] = @comment.errors.full_messages
  		redirect_to :back
  	end


  end

  private
  	def comment_params
  		params.require(:comment).permit(:user_id, :comment, :event_id)
  	end
end

Rails.application.routes.draw do

  get '/', to: 'users#index'
  get '/events', to: 'events#index'
  get '/user/:id', to: 'users#show_user'
  post '/user/update/:id', to: 'users#edit_user'
  get '/events/:id', to: 'events#show'
  post '/register', to: 'users#register'
  post '/login', to: 'users#login'
  get '/logout', to: 'users#logout'
  get '/edit/event/:id', to: 'events#edit'
  get '/event/join/:id', to: 'events#join'
  get '/cancel/event/:id', to: 'events#cancel'
  post '/add/event', to: 'events#create'
  post '/add/comment', to: 'comments#add'
  get '/edit/event/:id', to: 'events#edit'
  post '/update/event/:id', to: 'events#update'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

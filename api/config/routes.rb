Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :parkings

  resources :cars, only: %i[index create destroy show]do
    collection do
      post :park
      post :unpark
    end
  end
end

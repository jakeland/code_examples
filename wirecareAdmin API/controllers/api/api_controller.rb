# INCLUDED FOR A MORE COMPLETE PICTURE
class Api::ApiController < ApplicationController
  skip_before_action :rvu #simplified for security reasons...
  skip_before_filter :vat
  before_action :require_localhost
  before_action :ensure_500 #if we don't have JSON format, should just error without wasting time. 
  # THE FOLLOWING CODE IS RELEVENT 
  rescue_from ApiExceptions::BaseException, with: :render_api_error_response 

  def render_api_error_response(error)
    render json: {"status": "error", "message": error.message}.to_json
  end

  def ensure_500
    # return a 500 unless we do JSON
    return if request.format == :json
    render head: 500, status: 500
  end
  
  # END OF RELEVENT CODE 
  def require_localhost
    return unless Rails.env.production?
    ip_list = []# this array contained ip's, so they have been erased per prior employers request. 
    render_404 unless ip_list.include?(request.remote_ip.to_s)
  end

  def render_404
    render file: "#{Rails.root}/public/404.html", status: 404, layout: false
  end
end

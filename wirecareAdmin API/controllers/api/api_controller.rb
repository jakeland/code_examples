class Api::ApiController < ApplicationController
  skip_before_action :require_valid_user
  skip_before_filter :verify_authenticity_token
  before_action :require_localhost
  # THE FOLLOWING CODE WAS ADDED TO DEAL WITH ERRORS IN THE API
  before_action :ensure_500
  rescue_from ApiExceptions::BaseException, with: :render_api_error_response

  def render_api_error_response(error)
    render json: {"status": "error", "message": error.message}.to_json
  end

  def ensure_500
    # return a 500 unless we do JSON
    return if request.format == :json
    render head: 500, status: 500
  end
# END OF CODE ADDED BY JAKE
  def require_localhost
    return unless Rails.env.production?
    ip_list = []# this array contained ip's, so they have been erased. 
    render_404 unless ip_list.include?(request.remote_ip.to_s)
  end

  def render_404
    render file: "#{Rails.root}/public/404.html", status: 404, layout: false
  end
end

# JSON API for wirecare ap to tell admin to save a product line, thus
# triggering any callbacks for slugs, caches, solr, etc.
class Api::ProductLinesController < Api::ApiController
  def save
    begin
      @product_line = ProductLine.find(params[:product_line_id])
      @product_line.save
    rescue => e
      render json: { status: "error", error: e.message }
    end
  end
end

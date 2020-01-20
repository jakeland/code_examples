require 'test_helper'
class Api::ProductsControllerTest  < ActionController::TestCase
  def setup
    @prod = Product.all.third # all used to make sure we get the actual record. 
    @prod_image_ids =  @prod.product_images.pluck(:id).map(&:to_s) #string params because that's what we expect.
  end

  def teardown

  end

  test 'updating the image fails when the image_ids is not a number' do
    product_image_ids = ['pants!']
    post :update_tied_image_name,
    format: :json, 
    techflex_part_number: 'pantspantspants',
    old_techflex_part_number: @prod.techflex_part_number,
    image_ids: product_image_ids
    body = JSON.parse(response.body)
    assert_equal ApiExceptions::ProductImageError::WrongParamTypeImageIds.new.status, body['status']
    assert_equal ApiExceptions::ProductImageError::WrongParamTypeImageIds.new.message, body['message']
  end

  test 'updating the part number in an image file name fails when missing the new and old names resulting in error message' do
    product_image_ids = @prod_image_ids
    post :update_tied_image_name,
    format: :json, 
    image_ids: product_image_ids
    body = JSON.parse(response.body)
    assert_equal ApiExceptions::ProductImageError::MissingParam.new.status, body['status']
    assert_equal ApiExceptions::ProductImageError::MissingParam.new.message, body['message']
  end

  test 'updating the part number in an image file name fails when missing the image ids' do
    post :update_tied_image_name,
    format: :json,
    techflex_part_number: 'pantspantspants',
    old_techflex_part_number: @prod.techflex_part_number
    body = JSON.parse(response.body)
    assert_equal ApiExceptions::ProductImageError::MissingParam.new.status, body['status']
    assert_equal ApiExceptions::ProductImageError::MissingParam.new.message, body['message']
  end

  test 'update the part number in an  image file name' do
    product_image_ids = @prod_image_ids
    post :update_tied_image_name,
         format: :json,
         techflex_part_number: 'pantspantspants',
         old_techflex_part_number: @prod.techflex_part_number,
         image_ids: product_image_ids
    body = JSON.parse(response.body)
    puts body['message']
    assert_equal 'success', body['status']
    assert_equal 'pantspantspants.jpg', @prod.product_images.first.image_file_name
  end


  test 'save products through api' do 
    updated_at = @prod.updated_at # used to check the api call skipped active record, updated slug.
    post :tfpn_save, format: :json, techflex_part_number: @prod.techflex_part_number
    body = JSON.parse(response.body)
    assert_equal 'success', body['status']
    refute_equal nil, @prod.slug
  end

  test 'reset slug' do 
    updated_at = @prod.updated_at # used to check the api call skipped active record, updated slug.
    post :reset_slug, format: :json, techflex_part_number: @prod.techflex_part_number
    body = JSON.parse(response.body)
    assert_equal 'success', body['status'] 
    refute_equal nil, @prod.slug
  end

  test 'sending an api call updates the key slug and returns a status of success' do
    slug = (@prod.slug == 'test_slug' ? 'test_slug_2' : 'test_slug') # in case we named it test_slug or something.  
    post  :update_key_value, format: :json, key: 'slug', value: slug, product_id: @prod.id
    body = JSON.parse(response.body)
    assert_equal 'success', body['status'] 
    assert_equal slug, Product.find(@prod.id).slug
  end

  test 'save a product returns a status of success' do
     get :save, format: :json, product_id: @prod.id
     body = JSON.parse(response.body)
     puts body
     assert_equal 'success', body['status']
  end

  test 'touch a product' do
    @prod.updated_at
    get  :touch, format: :json, product_id: @prod.id
    body = JSON.parse(response.body)
    touch_check = Product.find_by(id: @prod.id)
    assert_equal 'success', body['status']
    # as this is an api call, can't check prod.updated_at_changed?
    refute_equal @prod.updated_at, touch_check.updated_at 
  end

  # re in parenth. because it's actually indexing in the method, but we are testing that our products have been "re-indexed"
  test '(re)index Products' do 
    get  :reindex, format: :json, product_id: @prod.id
    assert_equal 200, response.status
  end
end

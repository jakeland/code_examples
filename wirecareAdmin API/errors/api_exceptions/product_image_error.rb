module ApiExceptions
  class ProductImageError < ApiExceptions::BaseException
    class ExampleError < ApiExceptions::ProductImageError
        #All errors are stored in base_exception.rb
    end
  end
end

module ApiExceptions
  class ProductImageError < ApiExceptions::BaseException
    class WrongParamTypeImageIds < ApiExceptions::BaseException
        #All errors are stored in base_exception.rb
    end
  end
end

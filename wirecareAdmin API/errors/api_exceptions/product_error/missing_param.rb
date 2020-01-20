module ApiExceptions
  class ProductError < ApiExceptions::BaseException
    class MissingParam < ApiExceptions::BaseException
        #All errors are stored in base_exception.rb
    end
  end
end

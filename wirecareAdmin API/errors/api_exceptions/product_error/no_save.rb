module ApiExceptions
  class ProductError < ApiExceptions::BaseException
    class NoSave < ApiExceptions::ProductError
        #All errors are stored in base_exception.rb
    end
  end
end

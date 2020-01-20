module ApiExceptions
  class BaseException < StandardError
    attr_reader :status, :message
    # generates each error message
    ERROR_DESCRIPTION = Proc.new {|message| {status: "error",  message: message}}

    # map calls proc to define each error message
    # error codes are constants defined in lib/api_exceptions.rb
    ERROR_CODE_MAP = {
      'ProductError::ExampleError' => ERROR_DESCRIPTION.call('this is an example'),
      'ProductError::NoProductsFound' => ERROR_DESCRIPTION.call('Could not find Product(s).'),
      'ProductError::NoSave' => ERROR_DESCRIPTION.call('Could not save Product.'),
      'ProductError::MissingId' => ERROR_DESCRIPTION.call('can\'t find product without ID\'s'),
      'ProductImageError::ExampleError' => ERROR_DESCRIPTION.call('this is an example but this time for image'),
      'ProductImageError::MissingImageIds' => ERROR_DESCRIPTION.call('No product Image ids passed.'),
      'ProductImageError::MissingArguments' => ERROR_DESCRIPTION.call('Arguments Missing. Expected 3 arguments.'),
      'ProductImageError::MissingParam' => ERROR_DESCRIPTION.call('API call is missing params.'),
      'ProductImageError::WrongParamTypeImageIds' => ERROR_DESCRIPTION.call('Wrong param type for image ids! given non integer value!')
    }
    # # maybe we use this for warnings. 
    # WARNING_CODE_MAP = {
    #   'ProductWarning::Example' => ERROR_DESCRIPTION.call('warning', 'this is a warning.')
    # }

    def initialize
      # regex to grab any ApiException and tell ti to grab whatever comes after...
      error_type = self.class.name.scan(/ApiExceptions::(.*)/).flatten.first
      ApiExceptions::BaseException::ERROR_CODE_MAP.fetch(error_type, {}).each do |attr, val|
        # instance variable set breaks encapsulation but also
        # allows you to create variables at run time despite not knowing what they might be until the code runs.
        # don't copy this line if you don't know how it works. You know who you are.
        instance_variable_set("@#{attr}".to_sym, val)
        # you've been warned.
      end
    end
  end
end

package fr.eseo.apiserver.util;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.Map;
import java.util.stream.Collectors;

public class ErrorUtil {

	public static Map<String, String> formatErrors(BindingResult result) {
		return result.getFieldErrors().stream()
				.collect(Collectors.toMap(FieldError::getField, DefaultMessageSourceResolvable::getDefaultMessage));
	}

}

package com.codecool.moviewatcher.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class MvcExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Object> validationErrorHandler(MethodArgumentNotValidException ex){
        List<String> errorsList = new ArrayList<>(ex.getErrorCount());

        ex.getAllErrors().forEach(error -> errorsList.add(error.getDefaultMessage()));

        return new ResponseEntity<>(errorsList, HttpStatus.BAD_REQUEST);
    }
}
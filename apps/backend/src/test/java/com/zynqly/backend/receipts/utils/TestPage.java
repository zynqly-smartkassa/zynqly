package com.zynqly.backend.receipts.utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NonNull;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public class TestPage<T> extends PageImpl<@NonNull T> {

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public TestPage(
            @JsonProperty("content") List<T> content,
            @JsonProperty("page") PageMetadata page) {
        super(content, PageRequest.of(page.number(), page.size()), page.totalElements());
    }

    record PageMetadata(
            @JsonProperty("size") int size,
            @JsonProperty("number") int number,
            @JsonProperty("totalElements") long totalElements,
            @JsonProperty("totalPages") int totalPages
    ) {}
}

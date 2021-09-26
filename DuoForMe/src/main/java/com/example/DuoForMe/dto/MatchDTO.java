package com.example.DuoForMe.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class MatchDTO {
    private List metadata;
    private List info;
}

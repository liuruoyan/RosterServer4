package com.cc.service.mapper;

import com.cc.domain.*;
import com.cc.service.dto.EnumEducationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link EnumEducation} and its DTO {@link EnumEducationDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EnumEducationMapper extends EntityMapper<EnumEducationDTO, EnumEducation> {



    default EnumEducation fromId(Long id) {
        if (id == null) {
            return null;
        }
        EnumEducation enumEducation = new EnumEducation();
        enumEducation.setId(id);
        return enumEducation;
    }
}

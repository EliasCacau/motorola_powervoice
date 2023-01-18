package com.example.powervoice.controller.request;

import java.sql.Date;
import java.time.LocalDate;

import com.example.powervoice.model.Feature;
import com.example.powervoice.model.Reaction;
import com.example.powervoice.model.User;
import com.example.powervoice.utils.UserHelper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReactionRequest {
    
    private Long featureId;
    private Long userId;

    public Reaction getReaction(){
        Reaction like = new Reaction();
        like.setDate(Date.valueOf(LocalDate.now()));

        Feature feature = new Feature();
        feature.setId(this.featureId);

        User user = UserHelper.getAuthenticatedUser();
        user.setId(this.userId);

        like.setFeature(feature);
        like.setUser(user);

        return like;
    }

}

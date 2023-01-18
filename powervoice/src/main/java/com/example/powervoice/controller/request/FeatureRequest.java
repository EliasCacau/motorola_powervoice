package com.example.powervoice.controller.request;

import com.example.powervoice.model.Feature;
import com.example.powervoice.model.Category;
import com.example.powervoice.model.Product;
import com.example.powervoice.model.EStatus;
import com.example.powervoice.model.User;
import com.example.powervoice.utils.UserHelper;
import java.sql.Date;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeatureRequest {

    private Long userId;

    private Long productId;

    private Long categoryId;

    private String title;

    private String description;

    private boolean report;

    public Feature getFeature(){

        Feature feature = new Feature();
        feature.setDescription(this.description);
        feature.setTitle(this.title);
        feature.setPublishDate(Date.valueOf(LocalDate.now()));
        feature.setViewsAmount(0);
        feature.setLikes(0);
        feature.setStatus(EStatus.New);
        feature.setReport(false);

        Product product = new Product();
        product.setId(this.productId);

        Category category = new Category();
        category.setId(this.categoryId);

        User user = UserHelper.getAuthenticatedUser();

        feature.setCategory(category);
        feature.setProduct(product);
        feature.setUser(user);

        return feature;
    }
}

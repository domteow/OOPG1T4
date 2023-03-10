package com.smu.oopg1t4.user;

import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.user.admin.Admin;
import com.smu.oopg1t4.user.vendor.Vendor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, Integer> {
    @Query("{'accountType':?0}")
    List<User> findByAccountType(String accountType);

    @Query("{'_id':?0, 'accountType': ?1}")
    List<User> findById(int id, String accountType);

    @Query("{'emailAddress':?0, 'accountType': ?1}")
    List<User> findByEmail(String emailAddress, String accountType);
}

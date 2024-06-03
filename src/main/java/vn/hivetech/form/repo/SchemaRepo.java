package vn.hivetech.form.repo;

import org.springframework.stereotype.Service;

import vn.hivetech.form.model.Schema;

import org.springframework.data.jpa.repository.JpaRepository;

@Service
public interface SchemaRepo extends JpaRepository<Schema, Long> {

}

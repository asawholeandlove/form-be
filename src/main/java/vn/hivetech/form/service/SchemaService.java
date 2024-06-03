package vn.hivetech.form.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import vn.hivetech.form.model.Schema;
import vn.hivetech.form.repo.SchemaRepo;

@Service
@AllArgsConstructor
public class SchemaService {
  private final SchemaRepo schemaRepo;

  public List<Schema> getAllSchemas() {
    return schemaRepo.findAll();
  }

  public void saveSchema(Schema schema) {
    schemaRepo.save(schema);
  }

  public void deleteSchema(Long id) {
    schemaRepo.deleteById(id);
  }

  public Schema getSchemaById(Long id) {
    return schemaRepo.findById(id).orElse(null);
  }

}

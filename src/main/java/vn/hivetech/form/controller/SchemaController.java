package vn.hivetech.form.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import vn.hivetech.form.model.Schema;
import vn.hivetech.form.service.SchemaService;

@RestController
@RequestMapping("/api/schemas")
@AllArgsConstructor
public class SchemaController {
  private final SchemaService schemaService;

  @GetMapping
  public List<Schema> getAllSchemas() {
    var schemas = schemaService.getAllSchemas();
    return schemas;
  }

  @PostMapping
  public void saveSchema(@RequestBody Schema schema) {
    schemaService.saveSchema(schema);
  }

  @DeleteMapping("/{id}")
  public void deleteSchema(@PathVariable Long id) {
    schemaService.deleteSchema(id);
  }

  @GetMapping("/{id}")
  public Schema getSchema(@PathVariable Long id) {
    return schemaService.getSchemaById(id);
  }
}

package vn.hivetech.form.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.hivetech.form.util.JsonConverter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "`schemas`")
public class Schema {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;

  @Column(columnDefinition = "TEXT")
  @Convert(converter = JsonConverter.class)
  private Object data; // This is the JSON string
}

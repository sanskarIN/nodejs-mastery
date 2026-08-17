export class SchemaRegistry {
  constructor() { this.schemas = new Map(); }

  register(subject, version, { required = [], validate = null } = {}) {
    if (!subject || !Number.isInteger(version) || version <= 0) throw new Error('invalid schema identity');
    const key = `${subject}@${version}`;
    if (this.schemas.has(key)) throw new Error('schema already exists');
    this.schemas.set(key, { required: [...required], validate });
  }

  assert(subject, version, payload) {
    const schema = this.schemas.get(`${subject}@${version}`);
    if (!schema) throw new Error(`unknown schema ${subject}@${version}`);
    for (const field of schema.required) {
      if (!(field in (payload ?? {}))) throw new Error(`missing required field: ${field}`);
    }
    if (schema.validate && !schema.validate(payload)) throw new Error('schema validation failed');
    return true;
  }
}

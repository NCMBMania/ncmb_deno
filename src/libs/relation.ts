import NCMB, { NCMBObject, NCMBRole, NCMBUser } from '../index'
import { JsonObject, NCMBRelationFormat, roleBaseJson, NCMBPointer } from '../@types/misc'

class NCMBRelation {
  private relatedClass: string | null = null
  private fields: roleBaseJson = {}
  private className: string | null = null
  constructor(className: string) {
    this.className = className
    switch (className) {
      case 'user':
        this.relatedClass = `/users`
        break
      case 'role':
        this.relatedClass = `/roles`
        break
      case 'installation':
        this.relatedClass = `/installations`
        break
      default:
        this.relatedClass = `/classes/${className}`
    }
  }

  add(obj: NCMBObject | NCMBRole | NCMBUser | NCMBObject[] | NCMBRole[] | NCMBUser[]): NCMBRelation {
    if (!this.fields.objects) {
      this.fields = {
        __op: 'AddRelation',
        objects: []
      }
    }
    if (!Array.isArray(obj)) {
      obj = [obj]
    }
    obj.forEach(o => {
      if (o._name !== this.className) {
        throw new Error('Relation objects can be input just from instance of same class with first input.')
      }
      this.fields.objects!.push(o)
    })
    return this
  }

  remove(obj: NCMBObject | NCMBRole | NCMBUser | NCMBObject[] | NCMBRole[] | NCMBUser[]): NCMBRelation {
    if (!this.fields.objects) {
      this.fields = {
        __op: 'RemoveRelation',
        objects: []
      }
    }
    if (!Array.isArray(obj)) {
      obj = [obj]
    }
    obj.forEach(o => {
      if (o._name !== this.className) {
        throw new Error('Relation objects can be input just from instance of same class with first input.')
      }
      this.fields.objects!.push(o)
    })
    return this
  }

  toJSON(): NCMBRelationFormat {
    const json: NCMBRelationFormat = {
      __op: this.fields.__op as string,
      objects:  []
    }
    if (this.fields.objects) {
      for (const obj of this.fields.objects) {
        json.objects.push((obj as NCMBObject).toPointer());
      }
    }
    return json
  }
}

export default NCMBRelation

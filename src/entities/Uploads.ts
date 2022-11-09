import { Entity, PrimaryKey, Property} from '@mikro-orm/core'
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
@Entity()
export class Uploads {

     
    @PrimaryKey()
    id:number;

    
    @Property({type:'text'})
    name!: string | undefined

    
    @Property({type:'text'})
    path!: string | undefined

     
    @Property({type:'number'})
    size!: Number |undefined

    @Property({type:'date'})
    createdAt : Date
 
}
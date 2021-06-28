import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService{
  async execute(name:string){
    const tagsRepositories = getCustomRepository(TagsRepositories)

    // VERIFICA SE O NOME ESTÁ PREENCHIDO
    if(!name){
      throw new Error("Incorrect name!");
    }

    // SELECT * FROM TAGS WHERE NAME = 'name'
    const tagAlreadyExists = await tagsRepositories.findOne({
      name
    });

    // VERIFICA SE A TAG JA EXISTE
    if (tagAlreadyExists){
      throw new Error("Tag already exists!");
    }

    // SE NÃO EXISTIR 
    const tag = tagsRepositories.create({
      name
    });

    await tagsRepositories.save(tag);
    return tag;
  }
}

export { CreateTagService }
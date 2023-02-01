import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty({ message: '栏目不能为空' })
    title: string
}

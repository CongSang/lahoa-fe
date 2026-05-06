import { Option } from "./common"

export interface Property {
  id: number
  code: string
  name: string
  values: Option[] | []
}
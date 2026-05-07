import { Option } from "./common"

export interface Property {
  id: string
  code: string
  name: string
  values: Option[] | []
}
import Agent from '../agent'
import { getName } from '../browser'
import factory from '../global'

factory(Agent, {}, getName(document))

import Agent from '../agent'
import factory, { fetchName } from '../global'

factory(Agent, {}, {}, fetchName(document), window)

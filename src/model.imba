
export class Todo

	var id = 0

	prop title
	prop completed

	def initialize title, completed = no
		@id = id++
		@title = title
		@completed = completed

	def id
		@id

	def toJSON
		{title: title, completed: completed}
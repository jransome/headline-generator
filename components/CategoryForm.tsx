import { TextInput, Group, Grid, ActionIcon, Box, Text, Button, Code } from '@mantine/core'
import { Trash } from 'tabler-icons-react'
import { Category } from '../models'

type Props = Category.ICategory & {
  updateCategory: (name: string, phrases: string[]) => void
}

const CategoryForm = ({ name, phrases, updateCategory }: Props) => {


  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Grid>
        {phrases.map((phrase, i) =>
          <Group key={i} sx={{ margin: '5px 10px', gap: 2 }}>
            <TextInput
              placeholder="blah blah..."
              required
              sx={{ flex: 1 }}
              value={phrase}
              onChange={(event) => {
                phrases[i] = event.target.value
                updateCategory(name, phrases)
              }}
            />
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => {
                phrases.splice(i)
                updateCategory(name, phrases)
              }}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        )}
      </Grid>

      <Group position="center" mt="md">
        <Button onClick={() => updateCategory(name, [...phrases, ''])}>
          Add phrase
        </Button>
      </Group>
    </Box>
  )

  // const [categoryDoc, setCategoryDoc] = useState<Category.ICategory>({ name: 'UNDEFINED', phrases: [] })
  // useEffect(() => {

  // }, [])

  // const form = useForm({
  //   initialValues: {
  //     employees: formList([{ name: '' }]),
  //   },
  // })

  // const fields = form.values.employees.map((_, index) => (
  //   <Group key={index} mt="xs">
  //     <TextInput
  //       placeholder="John Doe"
  //       required
  //       sx={{ flex: 1 }}
  //       {...form.getListInputProps('employees', index, 'name')}
  //     />
  //     <ActionIcon
  //       color="red"
  //       variant="hover"
  //       onClick={() => form.removeListItem('employees', index)}
  //     >
  //       <Trash size={16} />
  //     </ActionIcon>
  //   </Group>
  // ))

  // return (
  //   <Box sx={{ maxWidth: 500 }} mx="auto">
  //     {fields.length > 0 ? (
  //       <Group mb="xs">
  //         <Text weight={500} size="sm" sx={{ flex: 1 }}>
  //           Name
  //         </Text>
  //       </Group>
  //     ) : (
  //       <Text color="dimmed" align="center">
  //         No one here...
  //       </Text>
  //     )}

  //     {fields}

  //     <Group position="center" mt="md">
  //       <Button onClick={() => form.addListItem('employees', { name: '' })}>
  //         Add employee
  //       </Button>
  //     </Group>

  //     {/* <Text size="sm" weight={500} mt="md">
  //       Form values:
  //     </Text>
  //     <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
  //   </Box>
  // )
}

export default CategoryForm

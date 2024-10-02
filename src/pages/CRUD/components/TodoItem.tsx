import { usePatchTodoApi } from '@/apis/todo';
import useDomainStore from '@/store';

import { Switch } from '../../../components/switch';
import { useToast } from '../../../components/toast/use-toast';
import TodoEditIcon from './TodoEditIcon';

interface TodoItemProps {
  checked: boolean;
  todo: string;
  todoId: number;
}

const TodoItem = ({ checked, todo, todoId }: TodoItemProps) => {
  const { domain } = useDomainStore();
  const patchTodo = usePatchTodoApi(domain);
  const { toast } = useToast();
  const handleTodoPut = () => {
    if (checked === undefined) {
      toast({
        variant: 'destructive',
        title: 'Switch 에러',
        description: 'completed값이 없습니다 !',
      });
      return;
    }
    patchTodo(todoId);
  };

  return (
    <div className='px-8 py-4'>
      <div className='flex items-center justify-between font-medium'>
        <div className='flex items-center gap-2'>
          <Switch checked={checked || false} onClick={handleTodoPut} />
          <span>{todo}</span>
        </div>
        <TodoEditIcon todoId={todoId} />
      </div>
    </div>
  );
};

export default TodoItem;

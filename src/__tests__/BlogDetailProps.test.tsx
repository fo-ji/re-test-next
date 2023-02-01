import { render, screen } from '@testing-library/react';
import { Post } from '@/components';
import type { Post as PostType } from '@/types';

describe('Post component given props', () => {
  let dummyPostProps: PostType;
  beforeEach(() => {
    dummyPostProps = {
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
      userId: 1,
    };
  });

  it('Should render correctly with given props', () => {
    render(<Post {...dummyPostProps} />);

    expect(screen.getByText(dummyPostProps.id)).toBeInTheDocument();
    expect(screen.getByText(dummyPostProps.title)).toBeInTheDocument();
  });
});

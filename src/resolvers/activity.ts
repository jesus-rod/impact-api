import { Activity } from 'src/entities/Activity';
import { MyContext } from 'src/types';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class ActivityResolver {
  @Query(() => [Activity])
  activities(@Ctx() { em }: MyContext): Promise<Activity[]> {
    return em.find(Activity, {});
  }
}

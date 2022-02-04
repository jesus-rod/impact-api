import { Activity } from '../entities/Activity';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
@Resolver()
export class ActivityResolver {
  @Query(() => [Activity])
  activities(): Promise<Activity[]> {
    return Activity.find();
  }

  @Query(() => Activity, { nullable: true })
  activity(@Arg('id', () => Int) id: number): Promise<Activity | undefined> {
    return Activity.findOne(id);
  }

  @Mutation(() => Activity)
  async createActivity(
    @Arg('title', () => String) title: string,
    @Arg('consumption', () => Int) consumption: number
  ): Promise<Activity> {
    // 2 sql queries
    return Activity.create({
      title: title,
      consumption: consumption,
    }).save();
  }

  @Mutation(() => Activity)
  async updateActivity(
    @Arg('id', () => Int) id: string,
    @Arg('title', () => Int, { nullable: true }) title: string,
    @Arg('consumption', () => Int, { nullable: true }) consumption: number
  ): Promise<Activity> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Activity)
      .set({ title, consumption })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async deleteActivity(
    @Arg('id', () => Int) id: number
    // @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Activity.delete({ id });
    return true;
  }
}

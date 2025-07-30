import {Entity} from '@1770169-fitfriends/core';
import {Feedback} from '@1770169-fitfriends/types';

export class FeedbackEntity implements Feedback, Entity<string> {
  public id?: string;
  public assessment!: number;
  public content!: string;
  public createdAt!: Date;
  public authorId!: string;
  public trainingId!: string;

  constructor(feedback: Feedback) {
    this.populate(feedback);
  }

  static fromObject(feedback: Feedback) {
    return new FeedbackEntity(feedback);
  }

  public populate(feedback: Feedback) {
    this.id = feedback.id;
    this.assessment = feedback.assessment;
    this.content = feedback.content;
    this.createdAt = feedback.createdAt;
    this.authorId = feedback.authorId;
    this.trainingId = feedback.trainingId;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      assessment: this.assessment,
      content: this.content,
      createdAt: this.createdAt,
      authorId: this.authorId,
      trainingId: this.trainingId
    };
  }
}

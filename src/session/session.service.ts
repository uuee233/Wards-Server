import { Injectable } from '@nestjs/common';
import { Session } from './session.dto';
import { User, users } from '../user';
import { ip, server_address, ws_port } from 'src/config';

@Injectable()
export class SessionService {
  async getSession(session: Session) {
    let user: User | null = null;
    try {
      user = JSON.parse(await users.get(session.username));
      if (user) Object.setPrototypeOf(user, User.prototype);
    } catch {}
    if (user == null) {
      user = new User(session.username);
      user.store();
    } else {
      if (!user.levels) {
        user.levels = { USA: 1, Japan: 1, Germany: 1, Soviet: 1, Britain: 1 };
      }
      if (!user.xp) {
        user.xp = { USA: 0, Japan: 0, Germany: 0, Soviet: 0, Britain: 0 };
      }
      for (const key of ['USA', 'Japan', 'Germany', 'Soviet', 'Britain']) {
        if (user.levels[key] < 8) {
          user.levels[key] += 7;
        }
      }
      user.store();
    }
    if (user.banned) return 'banned';
    //else if (session.version != '自定义版本号，如果你不知道如何修改本地版本号就别动') return 'update';
    return {
      achievements_url:
        server_address + '/players/' + user.id + '/achievements',
      all_knockout_tourneys: [],
      britain_level: user.levels?.Britain ?? 1,
      britain_level_claimed: user.levels?.Britain ?? 1,
      britain_xp: user.xp?.Britain ?? 0,
      cards_blacklist: [],
      claimable_crate_level: 0,
      client_id: user.id,
      currency: 'USD',
      current_knockout_tourney: {},
      dailymissions_url:
        server_address + '/players/' + user.id + '/dailymissions',
      decks: {
        headers: Object.values(user.decks),
      },
      decks_url: server_address + '/players/' + user.id + '/decks',
      diamonds: 99999,
      double_xp_end_date: '2025-07-03T12:13:36.889692Z',
      draft_admissions: 1,
      dust: 1000,
      email: null,
      email_reward_received: false,
      email_verified: false,
      extended_rewards: false,
      germany_level: user.levels?.Germany ?? 1,
      germany_level_claimed: user.levels?.Germany ?? 1,
      germany_xp: user.xp?.Germany ?? 0,
      gold: 999999,
      has_been_officer: true,
      heartbeat_url: server_address + '/players/' + user.id + '/heartbeat',
      is_officer: true,
      is_online: true,
      japan_level: user.levels?.Japan ?? 1,
      japan_level_claimed: user.levels?.Japan ?? 1,
      japan_xp: user.xp?.Japan ?? 0,
      jti: '1',
      jwt: 'todo' + session.username,
      last_crate_claimed_date: '2025-07-02T11:24:15.567042Z',
      last_daily_mission_cancel: null,
      last_daily_mission_renewal: '2025-07-05T15:21:43.653915Z',
      last_logon_date: '2025-07-05T15:21:06.168847Z',
      launch_messages: [],
      library_url: server_address + '/players/' + user.id + '/library',
      linker_account: '',
      locale: 'zh-hans',
      misc: {
        createDate: '2025-07-02T11:24:15.529671Z',
        featuredAchievements: [],
      },
      new_cards: [],
      new_player_login_reward: {
        day: 8,
        reset: '0001-01-01 00:00:00',
        seconds: 0,
      },
      npc: false,
      online_flag: true,
      packs_url: server_address + '/players/' + user.id + '/packs',
      player_id: user.id,
      player_name: user.name,
      player_tag: user.tag,
      rewards: [],
      season_end: '2025-08-01T00:00:00Z',
      season_wins: 9999,
      server_options: `{"nui_mobile": 1, "scalability_override": {"Android_Low": {"console_commands": ["r.Screenpercentage 100"]}, "Android_Mid": {"console_commands": ["r.Screenpercentage 100"]}, "Android_High": {"console_commands": ["r.Screenpercentage 100"]}}, "appscale_desktop_default": 1.0, "appscale_desktop_max": 1.4, "appscale_mobile_default": 1.4, "appscale_mobile_max": 1.4, "appscale_mobile_min": 1.0, "appscale_tablet_min": 1.0, "battle_wait_time": 60, "nui_mobile": 1, "scalability_override": {"Android_Low": {"console_commands": ["r.Screenpercentage 100"]}, "Android_Mid": {"console_commands": ["r.Screenpercentage 100"]}, "Android_High": {"console_commands": ["r.Screenpercentage 100"]}}, "websocketurl": "ws://${ip}:${ws_port}"}`,
      server_time: '2025.07.06-04.06.03',
      soviet_level: user.levels?.Soviet ?? 1,
      soviet_level_claimed: user.levels?.Soviet ?? 1,
      soviet_xp: user.xp?.Soviet ?? 0,
      stars: 120,
      tutorials_done: 0,
      tutorials_finished: [
        'unlocking_germany_1',
        'unlocking_germany_2',
        'unlocking_germany_0',
        'germany_cards_rewarded',
        'unlocking_usa_8',
        'recruit_missions_done',
        'draft_1',
        'draft_ally',
        'draft_kredits',
        'unlocking_japan_0',
        'japan_cards_rewarded',
        'unlocking_soviet_0',
        'soviet_cards_rewarded',
        'unlocking_usa_0',
        'usa_cards_rewarded',
        'unlocking_britain_0',
        'britain_cards_rewarded',
      ],
      usa_level: user.levels?.USA ?? 1,
      usa_level_claimed: user.levels?.USA ?? 1,
      usa_xp: user.xp?.USA ?? 0,
      user_id: user.id,
    };
  }
}
